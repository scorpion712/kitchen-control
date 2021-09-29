
export interface IProductUnit {
    _id?: string,
    expiry_date: Date,
    admission_date: Date,
    amount: number,
}

export interface IProduct {
    _id?: string,
    name: string,
    category: string,
    units: [IProductUnit],
    //days_off: number,
}

export interface IEditProduct {
    _id?: string,
    name: string,
    category: string,
}

export interface IProductRemove {
    _id?: string, 
    amount: number,
    unit_id?: string,
}

export interface IProductUnitAdd {
    _id?: string,
    units: [IProductUnit], 
}