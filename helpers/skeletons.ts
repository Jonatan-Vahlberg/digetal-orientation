import _ from 'lodash'

export const detailRouteSkeleton: SkeletonRow[] = [
  {
    height: 30,
    className: 'mb-5',
    highlighted: true,
  },
  ..._.times(4, () => ({})),
  ..._.times(4, () => ({
    width: Math.floor(Math.random() * 30) + 20,
  })),
]

export const activeMapRouteSkeleton: SkeletonRow[] = [
  {
    height: 40,
    width: 100,
    className: 'mb-5',
    highlighted: true,
  },
  {
    width: 100,
    height: 450,
    style: {
      borderRadius: 10,
      backgroundImage: 'url(/images/yellow-map.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'absolute',
      backgroundPosition: 'center',
    },
  },
]
