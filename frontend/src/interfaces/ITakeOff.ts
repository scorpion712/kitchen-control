export interface ITakeOff {
    _id?: string,
    week_start: Date,
    week_end: Date,
    products: [{
        _id?: string,
        name: string,
        expiry_date: Date,
        admission_date: Date,
        amount: number,
        retirement_date: Date,
    }],
}