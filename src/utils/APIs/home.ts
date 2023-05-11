import rest from '../../utils/rest'

export const getHeroSection = (main_bg_section: string) => {
  return rest.get(`/api/main-background/type/${main_bg_section}`)
}

export const getAllSlideHome = () => {
  return rest.get(`/api/slide_home/`)
}

export const getSlideHome = (slide_nanoid: string) => {
  return rest.get(`/api/slide_home/${slide_nanoid}`)
}

export const getAllSection = () => {
  return rest.get(`api/home/`)
}

export const getSectionById = (id) => {
  return rest.get(`api/home/detail/post-detail/${id}`)
}

export const getPartnerDescription = (home_detail_nanoid) => {
  return rest.get(`api/home_description/${home_detail_nanoid}`)
}

export const getHighlightLocation = () => {
  return rest.get(`api/home_highlight_location/`)
}

export const getTestimonialSection = () => {
  return rest.get('api/testimonial/')
}

export const getCategory = () => {
  return rest.get('api/category/')
}

export const getNewsDisplayHome = () => {
  return rest.get('/api/articles/news/display_home')
}

export const getArticles = (article_section: string) => {
  return rest.get(`api/articles/type/${article_section}`)
}

export const getListNews = ({
  page,
  pageSize,
  categoryId
}: {
  page: number
  pageSize: number
  categoryId?: string
}) => {
  const queryString = categoryId ? `&category_nanoid=${categoryId}` : ''
  return rest.get(`api/articles/category/pagination/?page=${page}&page_size=${pageSize}${queryString}`)
}

export const getArticlesDetail = (article_nanoid: string) => {
  return rest.get(`api/articles/${article_nanoid}`)
}

export const getFaqs = (faqs_section) => {
  // faqs_section: endUser or merchant
  return rest.get(`api/faqs/type/${faqs_section}`)
}

export const getFaqsDetail = (faqs_nanoid) => {
  return rest.get(`api/faqs/${faqs_nanoid}`)
}

export const getPolicy = (policy_section) => {
  // policy_section: privacy or term_and_condition
  return rest.get(`api/policies/type/${policy_section}`)
}

export const getPromotions = () => {
  return rest.get('api/promotions/')
}

export const getActivePromotion = () => {
  return rest.get('api/promotions/active')
}
export const createUserPromotionNews = (params: {
  promotion_news_name: string
  promotion_news_email: string
  promotion_news_phone_number: string
}) => {
  return rest.post('api/user-promotion-news/create', params)
}

export const createPartner = (params: {
  partner_company_name: string
  partner_company_address: string
  partner_city_name: string
  partner_phone_number: string
  partner_email: string
  partner_description: string,
  source: string
  tracking_id: string,
  status: string
}) => {
  return rest.post('api/partner/create', params)
}

export const createAds = (params: {
  ads_company_name: string
  ads_company_address: string
  ads_city_name: string
  ads_job_name: string
  ads_vicegerent: string
  ads_phone_number: string
  ads_email: string
}) => {
  return rest.post('api/advertisements/create', params)
}

export const createContact = (params: {
  contact_name: string
  contact_email: string
  contact_topic: string
  contact_description: string
}) => {
  return rest.post('api/contact/create', params)
}
