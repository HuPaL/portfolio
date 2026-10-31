import { defineAsyncComponent, h } from 'vue'
import ExploreStatus from '@/components/layout/ExploreStatus.vue'

/**
 * The 3D explorer (three.js + TresJS) is its own chunk, fetched only when the user opts in.
 * While it loads or if it fails, the status screen offers a way back to the normal page.
 */
export const ExploreView = defineAsyncComponent({
  loader: () => import('@/scene/ExploreView.vue'),
  loadingComponent: { render: () => h(ExploreStatus) },
  errorComponent: { render: () => h(ExploreStatus, { failed: true }) },
  delay: 0,
})
