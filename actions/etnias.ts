import { revalidatePath } from 'next/cache';
import type { Etnia } from '@/types';

const URL = `${process.env.GATEWAY_URL}`;

export async function getAllEtnias(): Promise<Etnia[]> {
    const response = await fetch(`${URL}/etnias`, { cache: 'no-store' });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch etnias: ${errorText}`);
    }

    const data = await response.json();
    if (Array.isArray(data)) return data;
    return [];
}

export async function revalidateEtnias() {
    revalidatePath('/estudiantes');
}
