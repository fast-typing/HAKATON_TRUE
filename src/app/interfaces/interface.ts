export interface Product {
    name: string
    price: number
    description: string
    img: string
    type: string
    id: string
}

export interface Service {
    name: string
    price: string
    time: string
    type: string
    description: string
    img: string
    id: string
    rented_days: any
    phone_number: string
}

export interface Problem {
    collected: number
    necessary: number
    description: string
    title: string
    id: string
}