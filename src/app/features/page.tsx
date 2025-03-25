import AutoScrollReveal from '@/registry/components/framer/framer-auto-scroll-reveal/framer-auto-scroll-reveal'
import Features1 from '@/registry/section/features/features-card-1/features'
import Features2 from '@/registry/section/features/features-bento-1/features'
import Features3 from '@/registry/section/features/features-bento-2/features'
import Features4 from '@/registry/section/features/features-bento-3/features'
import Features5 from '@/registry/section/features/features-grid-1/features'
import React from 'react'

const features = [Features1, Features2, Features3, Features4, Features5]
function FeaturesPage() {
  return (
    <div className="container mx-auto">
    <AutoScrollReveal once={false} className='w-full' components={features.map((Component) => <Component key={Component.name} />)} />
    </div>
  )
}

export default FeaturesPage