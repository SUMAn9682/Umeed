interface Address {
    state: string;
    district: string;
    city: string;
}

interface ContactDetails {
    email: string;
    phone: string;
}

interface Volunteer {
    user: {
        _id: string;
        name: string;
        email: string;
        phone: string;
    };
    canShareDetails: boolean;
}

export interface BloodRequest {
    _id: string;
    bloodGroup: string;
    urgency: string;
    message: string;
    contactDetails: ContactDetails;
    status: string;
    userId: string;
    address: Address;
    createdAt: string;
    volunteers: Volunteer[];
}