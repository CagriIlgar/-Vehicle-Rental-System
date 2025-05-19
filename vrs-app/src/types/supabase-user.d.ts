// types/supabase-user.d.ts

export interface SupabaseUser {
    id: string;              // Supabase user id
    email?: string | null;
    email_confirmed_at?: string | null;
    phone?: string | null;
    user_metadata?: {
        surname?: string;
        isBusiness?: boolean;
        businessPhone?: string;
        businessCity?: string;
        sellerId?: string;
        approved?: boolean;
        businessName?: string;
        isAdmin?: boolean;
        latitude?: number;
        longitude?: number;
        // Diğer özel alanlar
    };
    // Diğer Supabase user alanları
}
