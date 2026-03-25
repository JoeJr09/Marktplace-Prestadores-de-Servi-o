export interface ProfessionalService {
  name: string
  price: string
  description: string
}

export interface Professional {
  id: string
  name: string
  category: string
  location: string
  rating: number
  reviewCount: number
  priceRange: string
  tags: string[]
  avatarColor: string
  isTopRated: boolean
  plan: string
  responseTime: string
  specialties: string[]
  services: ProfessionalService[]
  bioShort: string
  bioLong: string
}
