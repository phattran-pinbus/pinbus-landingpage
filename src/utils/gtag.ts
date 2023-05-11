export const GA_TRACKING_ID = process.env.GA_TRACKING_ID
const AT_CAMPAIGN_ID = process.env.AT_CAMPAIGN_ID

type MyWindow = typeof window & {
  gtag: (...args: any[]) => void
  AT: any
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (window && typeof window !== 'undefined') {
    return (window as MyWindow).gtag('config', GA_TRACKING_ID, {
      page_path: url
    })
  }
}

// export const ATInit = () => {
//   if (window && typeof window !== 'undefined') {
//     return (window as MyWindow).AT.init({
//       campaign_id: Number(AT_CAMPAIGN_ID),
//       is_reoccur: 0,
//       is_lastclick: 1,
//       cookie_duration: 30
//     })
//   }
// }

export const ATTrack = () => {
  if (window && typeof window !== 'undefined') {
    return (window as MyWindow).AT.track()
  }
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  return (window as MyWindow).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}
