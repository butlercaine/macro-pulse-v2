import { put, Blob } from '@vercel/blob';
import { ScraperData } from './scraper-types';

const BLOB_URL = process.env.BLOB_READ_WRITE_TOKEN
  ? `https://${process.env.BLOB_READ_WRITE_TOKEN.split(':')[0]}.public.blob.vercel-storage.com`
  : undefined;

const SCRAPER_DATA_PATH = 'scraper-data/latest.json';

/**
 * Fetches scraper data from Vercel Blob storage.
 * Returns parsed ScraperData or null if unavailable.
 */
export async function getScraperData(): Promise<ScraperData | null> {
  if (!BLOB_URL) {
    console.warn('[scraper-data] BLOB_READ_WRITE_TOKEN not configured');
    return null;
  }

  try {
    const response = await fetch(`${BLOB_URL}/${SCRAPER_DATA_PATH}`, {
      next: { revalidate: 0 }, // Always fetch fresh
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn('[scraper-data] Blob not found');
        return null;
      }
      throw new Error(`Blob fetch failed: ${response.status}`);
    }

    const data = (await response.json()) as unknown;

    // Basic validation
    if (!data || typeof data !== 'object') {
      console.warn('[scraper-data] Invalid blob format');
      return null;
    }

    return data as ScraperData;
  } catch (error) {
    console.error('[scraper-data] Error fetching blob:', error);
    return null;
  }
}

/**
 * Uploads scraper data to Vercel Blob storage.
 * Used by server-side processes only.
 */
export async function uploadScraperData(
  data: ScraperData
): Promise<{ success: boolean; url?: string; error?: string }> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { success: false, error: 'BLOB_READ_WRITE_TOKEN not configured' };
  }

  try {
    const blob = await put(SCRAPER_DATA_PATH, JSON.stringify(data), {
      access: 'public',
      contentType: 'application/json',
    });

    return { success: true, url: blob.url };
  } catch (error) {
    console.error('[scraper-data] Error uploading blob:', error);
    return { success: false, error: String(error) };
  }
}
