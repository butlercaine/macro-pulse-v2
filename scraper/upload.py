"""
Vercel Blob Upload Script

Uploads scraped JSON data to Vercel Blob storage via REST API.
"""

import os
import sys
import json
import logging
from pathlib import Path
from typing import Optional
from datetime import datetime

import httpx

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)


# Vercel Blob Configuration
BLOB_API_VERSION = "2023-05-01"
BLOB_READ_WRITE_TOKEN = os.environ.get("BLOB_READ_WRITE_TOKEN")
BLOB_STORE_ID = os.environ.get("BLOB_STORE_ID") or os.environ.get("BLOB_STORE_ID")
DEFAULT_BLOB_URL = f"https://{BLOB_STORE_ID}.blob.vercel-storage.com"


class VercelBlobUploader:
    """Handles uploads to Vercel Blob storage."""
    
    def __init__(
        self,
        token: Optional[str] = None,
        store_id: Optional[str] = None,
        base_url: Optional[str] = None,
    ):
        """
        Initialize the uploader.
        
        Args:
            token: Vercel Blob read/write token
            store_id: Vercel Blob store ID
            base_url: Custom base URL for Blob API
        """
        self.token = token or BLOB_READ_WRITE_TOKEN
        self.store_id = store_id or BLOB_STORE_ID
        self.base_url = base_url or DEFAULT_BLOB_URL
        
        if not self.token:
            logger.warning("BLOB_READ_WRITE_TOKEN not set - uploads will fail")
        if not self.store_id:
            logger.warning("BLOB_STORE_ID not set - uploads will fail")
    
    def _get_headers(self) -> dict:
        """Get headers for API requests."""
        return {
            "Authorization": f"Bearer {self.token}",
            "x-vercel-blob-api-version": BLOB_API_VERSION,
            "Content-Type": "application/json",
        }
    
    def upload_file(
        self,
        file_path: str,
        blob_path: str = "latest.json",
    ) -> dict:
        """
        Upload a local file to Vercel Blob.
        
        Args:
            file_path: Path to local file
            blob_path: Target path in blob storage
            
        Returns:
            dict with success status and details
        """
        if not self.token:
            return {
                "success": False,
                "error": "BLOB_READ_WRITE_TOKEN not configured",
            }
        
        try:
            # Read file content
            with open(file_path, "rb") as f:
                content = f.read()
            
            # Upload via PUT request
            url = f"{self.base_url}/{blob_path}"
            headers = self._get_headers()
            
            with httpx.Client(timeout=30.0) as client:
                response = client.put(
                    url,
                    content=content,
                    headers=headers,
                )
            
            if response.status_code in (200, 201):
                logger.info(f"Successfully uploaded {file_path} → {blob_path}")
                return {
                    "success": True,
                    "url": response.json().get("url", f"{self.base_url}/{blob_path}"),
                    "path": blob_path,
                    "size": len(content),
                    "timestamp": datetime.utcnow().isoformat(),
                }
            else:
                error_msg = f"Upload failed: {response.status_code} - {response.text}"
                logger.error(error_msg)
                return {
                    "success": False,
                    "error": error_msg,
                    "status_code": response.status_code,
                }
                
        except FileNotFoundError:
            error_msg = f"File not found: {file_path}"
            logger.error(error_msg)
            return {"success": False, "error": error_msg}
        except json.JSONDecodeError:
            error_msg = f"Invalid JSON in file: {file_path}"
            logger.error(error_msg)
            return {"success": False, "error": error_msg}
        except httpx.RequestError as e:
            error_msg = f"HTTP request failed: {e}"
            logger.error(error_msg)
            return {"success": False, "error": error_msg}
        except Exception as e:
            error_msg = f"Unexpected error: {e}"
            logger.error(error_msg)
            return {"success": False, "error": error_msg}
    
    def upload_json(
        self,
        data: dict,
        blob_path: str = "latest.json",
    ) -> dict:
        """
        Upload JSON data directly to Vercel Blob.
        
        Args:
            data: Python dict to upload as JSON
            blob_path: Target path in blob storage
            
        Returns:
            dict with success status and details
        """
        if not self.token:
            return {
                "success": False,
                "error": "BLOB_READ_WRITE_TOKEN not configured",
            }
        
        try:
            content = json.dumps(data, indent=2, default=str).encode("utf-8")
            
            url = f"{self.base_url}/{blob_path}"
            headers = self._get_headers()
            
            with httpx.Client(timeout=30.0) as client:
                response = client.put(
                    url,
                    content=content,
                    headers=headers,
                )
            
            if response.status_code in (200, 201):
                logger.info(f"Successfully uploaded JSON → {blob_path}")
                return {
                    "success": True,
                    "url": response.json().get("url", f"{self.base_url}/{blob_path}"),
                    "path": blob_path,
                    "size": len(content),
                    "timestamp": datetime.utcnow().isoformat(),
                }
            else:
                error_msg = f"Upload failed: {response.status_code} - {response.text}"
                logger.error(error_msg)
                return {
                    "success": False,
                    "error": error_msg,
                    "status_code": response.status_code,
                }
                
        except Exception as e:
            error_msg = f"JSON upload failed: {e}"
            logger.error(error_msg)
            return {"success": False, "error": error_msg}
    
    def get_blob_url(self, blob_path: str = "latest.json") -> str:
        """Get the public URL for a blob."""
        return f"{self.base_url}/{blob_path}"


def upload_to_blob(
    json_path: str = "tradingeconomics.json",
    blob_path: str = "scraper-data/latest.json",
) -> dict:
    """
    Upload scraped JSON data to Vercel Blob.
    
    Args:
        json_path: Path to local JSON file
        blob_path: Target path in Vercel Blob
        
    Returns:
        dict with success status and details
    """
    logger.info(f"Preparing to upload {json_path} to Vercel Blob...")
    
    uploader = VercelBlobUploader()
    result = uploader.upload_file(json_path, blob_path)
    
    if result["success"]:
        logger.info(f"Upload successful: {result['url']}")
    else:
        logger.error(f"Upload failed: {result.get('error')}")
    
    return result


def upload_latest(json_path: str = "tradingeconomics.json") -> dict:
    """
    Upload to 'latest.json' with timestamped backup.
    
    Creates:
    - scraper-data/latest.json (primary)
    - scraper-data/history/YYYY-MM-DD.json (backup)
    
    Args:
        json_path: Path to local JSON file
        
    Returns:
        dict with success status and details
    """
    import shutil
    from datetime import datetime
    
    results = {}
    
    # Upload primary
    results["latest"] = upload_to_blob(json_path, "scraper-data/latest.json")
    
    # Create timestamped backup
    timestamp = datetime.utcnow().strftime("%Y-%m-%d")
    backup_path = f"scraper-data/history/{timestamp}.json"
    
    # Ensure history directory exists
    Path(backup_path).parent.mkdir(parents=True, exist_ok=True)
    
    # Copy file for backup
    shutil.copy(json_path, backup_path)
    logger.info(f"Created backup: {backup_path}")
    
    # Upload backup
    results["backup"] = upload_to_blob(backup_path, backup_path)
    
    # Summary
    all_success = all(r.get("success", False) for r in results.values())
    return {
        "success": all_success,
        "results": results,
        "timestamp": datetime.utcnow().isoformat(),
    }


def main():
    """CLI entry point for upload script."""
    import argparse
    
    parser = argparse.ArgumentParser(description="Upload JSON to Vercel Blob")
    parser.add_argument(
        "json_path",
        nargs="?",
        default="tradingeconomics.json",
        help="Path to JSON file (default: tradingeconomics.json)",
    )
    parser.add_argument(
        "--blob-path",
        default="scraper-data/latest.json",
        help="Target path in Vercel Blob",
    )
    parser.add_argument(
        "--backup",
        action="store_true",
        help="Create timestamped backup",
    )
    
    args = parser.parse_args()
    
    if args.backup:
        result = upload_latest(args.json_path)
    else:
        result = upload_to_blob(args.json_path, args.blob_path)
    
    # Exit with error code if failed
    if not result.get("success"):
        sys.exit(1)


if __name__ == "__main__":
    main()
