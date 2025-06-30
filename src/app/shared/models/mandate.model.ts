export interface ApiResponse<T> {
  status: string;
  data: {
    status: string;
    message: string;
    data: T;
  };
}

// Since we're doing client-side pagination, we can simplify this
export interface MandateListResponse {
  status: string;
  data: {
    status: string;
    message: string;
    data: Mandate[]; // Now just returns array, not paginated structure
  };
}

export interface Mandate {
  id: string;
  status: string;
  reference: string;
  amount: number;
  balance: number;
  mandate_type: string;
  debit_type: string;
  account_name: string;
  account_number: string;
  live_mode: boolean;
  approved: boolean;
  ready_to_debit: boolean;
  nibss_code: string;
  institution: {
    bank_code: string;
    nip_code: string;
    name: string;
  };
  customer: string;
  narration: string;
  redirect_url: string;
  start_date: string;
  end_date: string;
  date: string;
}

export interface Transaction {
  id: string;
  amount: number;
  status: string;
  reference: string;
  narration: string;
  date: string;
}

// Add this new interface for action responses
export interface ActionResponse {
  message: string;
  success: boolean;
}
