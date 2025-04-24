export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    canDonate: boolean;
    status: 'doctor' | 'medical student' | 'others';
    address: {
        state: string;
        district: string;
        city: string;
    };
    info: {
        bloodGroup: string;
        height: number;
        weight: number;
    };
}