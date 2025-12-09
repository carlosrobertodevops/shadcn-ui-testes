import { BarChart3Icon, DatabaseIcon, LineChartIcon, ShieldCheckIcon, SparklesIcon, ZapIcon } from 'lucide-react'

import Header from '@/components/shadcn-studio/blocks/hero-section-23/header'
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-23/hero-section-23'
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02'

const navigationData: Navigation[] = [
  {
    title: 'Home',
    href: '#'
  },
  {
    title: 'Features',
    subtitle: 'Features',
    imgSubtitle: 'Platform',
    contentClassName: '!w-130',
    items: [
      {
        icon: <BarChart3Icon className='size-4' />,
        title: 'Analytics Dashboard',
        href: '#',
        description: 'Track performance and compare trends with actionable insights'
      },
      {
        icon: <LineChartIcon className='size-4' />,
        title: 'Sales Tracking',
        href: '#',
        description: 'Monitor total sales and revenue in real-time'
      },
      {
        icon: <DatabaseIcon className='size-4' />,
        title: 'Customer Data',
        href: '#',
        description: 'Transform customer data into valuable product insights'
      }
    ],
    imageSection: {
      img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/hero/image-66.png',
      href: '#',
      title: 'Intelligence Analytics',
      description: 'Leverage data to stay ahead with business intelligence'
    }
  },
  {
    title: 'Product',
    contentClassName: '!w-80',
    items: [
      {
        icon: <SparklesIcon className='size-4' />,
        title: 'AI Features',
        href: '#',
        description: 'Perfectly organized with AI-powered features'
      },
      {
        icon: <ZapIcon className='size-4' />,
        title: 'Integrations',
        href: '#',
        description: 'Connect with your favorite tools seamlessly'
      },
      {
        icon: <ShieldCheckIcon className='size-4' />,
        title: 'Security',
        href: '#',
        description: 'Enterprise-grade security for your data'
      }
    ]
  },
  {
    title: 'Company',
    contentClassName: '!w-42',
    items: [
      {
        title: 'About Us',
        href: '#'
      },
      {
        title: 'Pricing',
        href: '#'
      },
      {
        title: 'Customers',
        href: '#'
      },
      {
        title: 'Contact',
        href: '#'
      }
    ]
  }
]

const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'OS',
    name: 'Olivia Sparks'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'HL',
    name: 'Howard Lloyd'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'JW',
    name: 'Jenny Wilson'
  }
]

const HeroSectionPage = () => {
  return (
    <div className='flex flex-col'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className='flex flex-col'>
        <HeroSection avatars={avatars} />
      </main>
    </div>
  )
}

export default HeroSectionPage
