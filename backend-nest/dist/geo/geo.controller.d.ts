interface AddressSuggestion {
    display_name: string;
    lat: number;
    lon: number;
    address: {
        city?: string;
        state?: string;
        postcode?: string;
    };
}
export declare class GeoController {
    search(q: string, limit?: string): Promise<AddressSuggestion[]>;
}
export {};
