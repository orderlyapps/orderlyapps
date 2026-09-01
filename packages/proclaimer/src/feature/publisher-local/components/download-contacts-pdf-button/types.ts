import type { Publisher } from "@amodeo/proclaimer/feature/publisher";

/**
 * Type for contact data (publisher with contact information)
 */
export interface ContactWithDetails extends Publisher {
  phone?: string;
  email?: string;
  address?: {
    street_line?: string;
    suburb?: string;
  };
  emergency_contact?: {
    first_name: string;
    last_name: string;
    phone?: string;
  };
}
