export interface IAdmin {
  user_nanoid: string
  email: string
  password: string
  role: string
  created_at: string
}

export interface IHeroSection {
  main_bg_nanoid?: string
  main_bg_title?: string
  main_bg_content?: string
  main_bg_url_img?: string
  main_bg_section?: string
  main_bg_sub_title?: string
}

export interface ISlideContent {
  title?: string
  content?: string
  image?: string
  subtitle?: string
}
export interface ISlideHome {
  slide_nanoid?: string
  content?: ISlideContent[]
  created_at?: string
}

export interface ISectionProps {
  home_nanoid?: string
  home_title?: string
  home_description?: string
  home_section?: string
  home_visible?: boolean
}

export interface IArticle {
  article_nanoid?: string
  article_title?: string
  article_content?: string
  article_url_img?: string
  article_section?: string
  display_home?: boolean
  category?: {
    category_nanoid?: string
    category_name?: string
  }
  article_created_at?: string
  article_description?: string
}

export interface ICategory {
  category_nanoid?: string
  category_name: string
  created_at?: string
}

export interface IVideoProps {
  duration: number
  hash: string
  height: number
  thumbnail: string
  video_nanoid: string
  video_url: string
  width: number
}

export interface IMedia {
  media_nanoid?: string
  media_url: string
  media_thumbnail: string
}

export interface ISectionContent {
  home_detail_nanoid?: string
  home_detail_title?: string
  home_detail_content?: string[]
  home_detail_media?: IMedia
  home_detail_video?: IVideoProps
  home_detail_relate_article?: boolean
  home_detail_link?: string
  article_nanoid?: IArticle
  created_at?: string
  home_detail_description?: string
}

export interface ITestimonials {
  testimonial_nanoid?: string
  testimonial_name?: string
  testimonial_content?: string[]
  testimonial_avatar?: string
  testimonial_position_company_name?: string
  created_at?: string
}

export interface IHighlightLocation {
  created_at?: string
  highlight_position_nanoid: string
  highlight_position_title: string
  highlight_position_address: string
  highlight_position_img: string
  highlight_position_status: boolean
  display_on_home: boolean
  highlight_position_province: string
  highlight_position_district: string
  highlight_position_fields: string
  link: string
}

export interface IFaqs {
  faqs_nanoid: string
  faqs_question: string
  faqs_answer: string
  faqs_type_section: string
  created_at?: string
}

export interface IPolicy {
  policy_nanoid: string
  policy_content: string
  policy_type_section: string
}

export interface IPromotion {
  promotion_title: string
  promotion_content: string
  created_at: string
  promotion_nanoid: string
  promotion_desktop_img: string
  promotion_mobile_img: string
  promotion_display_on_home: string
  promotion_image_content: string
  promotion_link: string
  active: boolean
}

export interface IUserPromotionNews {
  promotion_news_name: string
  promotion_news_email: string
  promotion_news_phone_number: string
  created_at?: string
}

export interface IPartner {
  partner_nanoid: string
  partner_company_name: string
  partner_company_address: string
  partner_city_name: string
  partner_phone_number: string
  partner_email: string
  partner_description: string
  created_at?: string
  source?: string
  tracking_id?: string
}

export interface IAds {
  ads_company_name: string
  ads_company_address: string
  ads_city_name: string
  ads_job_name: string
  ads_vicegerent: string
  ads_phone_number: string
  ads_email: string
  created_at?: string
}

export interface IContact {
  contact_name: string
  contact_email: string
  contact_topic: string
  contact_description: string
  created_at?: string
}
