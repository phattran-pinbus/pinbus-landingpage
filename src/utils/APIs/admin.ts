import rest from '../../utils/rest'
import adminAPI from '../../utils/rest-admin'

export const login = (params: { email: string; password: string }) => {
  return rest.post(`api/auth/login/`, params)
}

export const getAdminUser = () => {
  return adminAPI.get(`api/auth/get-users/`)
}

export const createAdminUser = (params: { email: string; password: string; role: string }) => {
  return adminAPI.post(`api/auth/create-user/`, params)
}

export const deleteAdminUser = (user_nanoid: string) => {
  return adminAPI.delete(`api/auth/delete-user/${user_nanoid}`)
}

export const getMe = () => {
  return adminAPI.get(`api/auth/users/`)
}

export const uploadMedia = (image) => {
  //upload image
  const formData = new FormData()
  formData.append('image', image)
  return adminAPI.post(`api/auth/upload-image/`, formData)
}

//HOME SECTION
export const getHomeSections = (sectionName: string) => {
  return adminAPI.get(`api/main-background/type/${sectionName}`)
}

export const updateHomeSection = (
  sectionId: string,
  params: {
    main_bg_title?: string
    main_bg_content?: string
    main_bg_section: string
    main_bg_sub_title?: string
    main_bg_url_img?: string
  }
) => {
  //TODO: update type later
  return adminAPI.put(`api/main-background/update/${sectionId}`, params)
}

export const getSection = (home_nanoid: string) => {
  return rest.get(`api/home/${home_nanoid}/`)
}

export const updateSection = (
  home_nanoid: string,
  params: {
    home_title?: string
    home_description?: string
    home_section?: string
    home_visible?: boolean
  }
) => {
  return adminAPI.put(`api/home/update/${home_nanoid}`, params)
}

export const getContentSectionById = (home_nanoid: string) => {
  return rest.get(`api/home/detail/post-detail/${home_nanoid}`)
}

export const createContentSection = (params: {
  home_nanoid: string
  home_detail_title: string
  home_detail_content: string //string array
  home_detail_media: string
  home_detail_video: string
  home_detail_relate_article: boolean // default false if not relate article
  article_nanoid: string // if relate article true, It must exist article nanoid
}) => {
  return adminAPI.post(`api/home/detail`, params)
}

export const deleteContentSection = (home_detail_nanoid: string) => {
  return adminAPI.delete(`api/home/update/detail/${home_detail_nanoid}`)
}

export const updateContentSection = (
  home_detail_nanoid: string,
  params: {
    home_nanoid: string
    home_detail_title: string
    home_detail_content: string //string array
    home_detail_media: string
    home_detail_video: string
    home_detail_relate_article: boolean // default false if not relate article
    article_nanoid: string // if relate article true, It must exist article nanoid
  }
) => {
  return adminAPI.put(`api/home/update/detail/${home_detail_nanoid}`, params)
}

export const deleteDetailContentSection = (home_detail_nanoid: string) => {
  return adminAPI.delete(`api/home/update/detail/${home_detail_nanoid}`)
}

// ----------------------Highlight Position----------------------------
export const getHighlightPosition = () => {
  return rest.get(`api/home_highlight_location/`)
}

export const getHighlightPositionById = (highlight_position_nanoid: string) => {
  return rest.get(`api/home_highlight_location/${highlight_position_nanoid}`)
}

export const createHighlightPosition = (params: {
  highlight_position_title: string
  highlight_position_address: string
  highlight_position_img: string
  highlight_position_status: boolean
  display_on_home: boolean
  highlight_position_province: string
  highlight_position_district: string
  highlight_position_fields: string
}) => {
  return adminAPI.post(`api/home_highlight_location/create`, params)
}

export const updateHighlightPosition = (
  highlight_position_nanoid: string,
  params: {
    highlight_position_title: string
    highlight_position_address: string
    highlight_position_img: string
    highlight_position_status: boolean
    display_on_home: boolean
    highlight_position_province: string
    highlight_position_district: string
    highlight_position_fields: string
  }
) => {
  return adminAPI.put(`api/home_highlight_location/update/${highlight_position_nanoid}`, params)
}

export const deleteHighlightPosition = (highlight_position_nanoid: string) => {
  return adminAPI.delete(`api/home_highlight_location/update/${highlight_position_nanoid}`)
}

// ----------------------Home Description----------------------------
export const getHomeDescriptionById = (home_detail_nanoid: string) => {
  return rest.get(`api/home_description/${home_detail_nanoid}`)
}

export const getDescriptionDetailById = (testimonial_nanoid: string) => {
  return rest.get(`api/home_description/detail/${testimonial_nanoid}`)
}

export const createDescription = (params: { home_detail_nanoid: string; home_descript_content: string }) => {
  return adminAPI.post(`api/home_description/create`, params)
}

export const updateDescription = (
  home_descript_nanoid: string,
  params: {
    home_detail_nanoid: string
    home_descript_content: string
  }
) => {
  return adminAPI.put(`api/home_description/update/${home_descript_nanoid}`, params)
}

export const deleteDescription = (home_descript_nanoid: string) => {
  return adminAPI.delete(`api/home_description/update/${home_descript_nanoid}`)
}

// ----------------------Testimonial----------------------------
export const getTestimonial = () => {
  return rest.get(`api/testimonial/`)
}

export const getTestimonialById = (testimonial_nanoid: string) => {
  return rest.get(`api/testimonial/${testimonial_nanoid}`)
}

export const createTestimonial = (params: {
  testimonial_avatar: string
  testimonial_content: string
  testimonial_name: string
  testimonial_position_company_name: string
}) => {
  return adminAPI.post(`api/testimonial/create`, params)
}

export const updateTestimonial = (
  testimonial_nanoid: string,
  params: {
    testimonial_avatar: string
    testimonial_content: string
    testimonial_name: string
    testimonial_position_company_name: string
  }
) => {
  return adminAPI.put(`api/testimonial/update/${testimonial_nanoid}`, params)
}

export const deleteTestimonial = (testimonial_nanoid: string) => {
  return adminAPI.delete(`api/testimonial/update/${testimonial_nanoid}`)
}
// ----------------------User promotion news----------------------------
export const getUserPromotionNews = () => {
  return adminAPI.get(`api/user-promotion-news/`)
}

export const getUserPromotionNewsById = (promotion_news_nanoid: string) => {
  return rest.get(`api/user-promotion-news/${promotion_news_nanoid}`)
}

// END HOME SECTION

//PRODUCT SECTION
export const getHeaderProductBackground = () => {
  return adminAPI.get(`api/main-background/type/product`)
}
// Get Articles Product
export const getAllProduct = () => {
  return rest.get(`api/articles/type/product`)
}
export const getDetailProduct = (article_nanoid: string) => {
  return rest.get(`api/articles/${article_nanoid}`)
}
export const createProduct = (params: {
  article_title: string
  article_content: string
  article_url_img: string
  article_section: string
}) => {
  return adminAPI.post(`api/articles/`, params)
}
export const updateProduct = (
  article_nanoid: string,
  params: {
    article_title: string
    article_content: string
    article_url_img: string
    article_section: string
  }
) => {
  return adminAPI.post(`api/articles/${article_nanoid}`, params)
}
export const deleteProduct = (article_nanoid: string) => {
  return adminAPI.delete(`api/articles/update/${article_nanoid}`)
}

//END PRODUCT SECTION

//PARTNER SECTION
export const getHeaderPartnerBackground = () => {
  return adminAPI.get(`api/main-background/type/partner`)
}

export const getAllPartner = () => {
  return adminAPI.get(`api/partner/`)
}
export const updatePartner = (id, params) => {
  return adminAPI.put(`api/partner/update/${id}`, params)
}
export const getDetailPartner = (partner_nanoid: string) => {
  return adminAPI.get(`api/partner/${partner_nanoid}`)
}

export const getDetailPartnerArticle = (article_nanoid: string) => {
  return rest.get(`api/articles/${article_nanoid}`)
}
export const createProductArticle = (params: {
  article_title: string
  article_content: string
  article_url_img: string
  article_section: string // partner
}) => {
  return adminAPI.post(`api/articles/`, params)
}
export const updatePartnerArticle = (
  article_nanoid: string,
  params: {
    article_title: string
    article_content: string
    article_url_img: string
    article_section: string // partner
  }
) => {
  return adminAPI.post(`api/articles/${article_nanoid}`, params)
}
export const deletePartnerArticle = (article_nanoid: string) => {
  return adminAPI.delete(`api/articles/update/${article_nanoid}`)
}
//END PARTNER SECTION

//ADVERTISEMENT SECTION
export const getAllAds = () => {
  return adminAPI.get('api/advertisements/')
}

export const getDetailAds = (ads_nanoid: string) => {
  return adminAPI.get(`api/advertisements/${ads_nanoid}`)
}

export const updateAds = (
  ads_nanoid: string,
  params: {
    ads_company_name: string
    ads_company_address: string
    ads_city_name: string
    ads_job_name: string
    ads_vicegerent: string
    ads_phone_number: string
    ads_email: string
  }
) => {
  return adminAPI.put(`api/ads/update/${ads_nanoid}`, params)
}

export const deleteAds = (ads_nanoid: string) => {
  return adminAPI.delete(`api/advertisements/update/${ads_nanoid}`)
}
//-------Get Articles Ads-------
export const getAllAdsArticle = () => {
  return rest.get(`api/articles/type/ads`)
}
export const getDetailAdsArticle = (article_nanoid: string) => {
  return rest.get(`api/articles/${article_nanoid}`)
}
export const createAdsArticle = (params: {
  article_title: string
  article_content: string
  article_url_img: string
  article_section: string // ads
}) => {
  return adminAPI.post(`api/articles/`, params)
}
export const updateAdsArticle = (
  article_nanoid: string,
  params: {
    article_title: string
    article_content: string
    article_url_img: string
    article_section: string // partner
  }
) => {
  return adminAPI.post(`api/articles/${article_nanoid}`, params)
}
export const deleteAdsArticle = (article_nanoid: string) => {
  return adminAPI.delete(`api/articles/update/${article_nanoid}`)
}
//END ADVERTISEMENT SECTION

//PROMOTION
export const createPromotions = (params) => {
  return adminAPI.post('api/promotions/create', params)
}

export const deletePromotion = (promotion_nanoid) => {
  return adminAPI.delete(`api/promotions/update/${promotion_nanoid}`)
}

export const updatePromotion = (promotion_nanoid, params) => {
  return adminAPI.put(`api/promotions/update/${promotion_nanoid}`, params)
}

// Category
export const updateCategory = (
  category_nanoid: string,
  params: {
    category_name: string
  }
) => {
  return adminAPI.put(`api/category/${category_nanoid}`, params)
}

export const deleteCategory = (category_nanoid: string) => {
  return adminAPI.delete(`api/category/${category_nanoid}`)
}

export const createCategory = (params: { category_name: string }) => {
  return adminAPI.post(`api/category/create`, params)
}

//ARTICES
export const updateArticle = (article_nanoid: string, data: any) => {
  return adminAPI.put(`api/articles/update/${article_nanoid}`, data)
}

export const deleteArticle = (article_nanoid: string) => {
  return adminAPI.delete(`api/articles/update/${article_nanoid}`)
}

export const createArticle = (params: {
  article_title: string
  article_content: string
  article_url_img: string
  article_section: string
}) => {
  return adminAPI.post('api/articles/', params)
}

// FAQS
export const createFaqs = (params: { faq_question: string; faq_answer: string; faq_section: string }) => {
  return adminAPI.post('api/faqs/', params)
}

export const updateFaqs = (
  faqs_nanoid: string,
  params: {
    faqs_question: string
    faqs_answer: string
  }
) => {
  return adminAPI.put(`api/faqs/update/${faqs_nanoid}`, params)
}

export const deleteFaqs = (faqs_nanoid: string) => {
  return adminAPI.delete(`api/faqs/update/${faqs_nanoid}`)
}

// Policy

export const updatePolicy = (
  policy_nonoid: string,
  params: {
    policy_content: string
  }
) => {
  return adminAPI.put(`api/policies/update/${policy_nonoid}`, params)
}

// Slide Home

export const createSlideHome = (params: { content: string }) => {
  return adminAPI.post('api/slide_home/create', params)
}

export const updateSlideHome = (
  slide_nanoid: string,
  params: {
    content: any
  }
) => {
  return adminAPI.put(`api/slide_home/update/${slide_nanoid}`, params)
}

export const deleteSlideHome = (slide_nanoid: string) => {
  return adminAPI.delete(`api/slide_home/update/${slide_nanoid}`)
}
