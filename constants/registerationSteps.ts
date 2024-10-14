export const getSteps = () => {
  return [
    {
      id: 1,
      route: 'business-information',
      title: 'Step 1',
      description: 'Add information about your business',
      estimitadeTime: '6m',
      icon: 'Work',
      key: 'profile'
    },
    {
      id: 2,
      route: 'location',
      title: 'Step 2',
      description: 'Add your business addresss',
      estimitadeTime: '2m',
      icon: 'location',
      key: 'photos'
    },
    {
      id: 3,
      route: 'photos',
      title: 'Step 3',
      description: 'Upload at least 6 high quality photos / videos',
      estimitadeTime: '3m',
      icon: 'images',
      key: 'address'
    }
  ]
}
