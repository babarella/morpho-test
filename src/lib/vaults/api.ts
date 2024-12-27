export async function mockDelay<T>(delay = 2000, response?: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(response as T), delay)
  })
}

export async function fetchSearchByName() {
  await mockDelay(3000)
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  return [
    {
      address: '1',
      chainId: 1,
      image: '',
      name: `Vault ${getRandomInt(100000000000)}`,
    },
    {
      address: '2',
      chainId: 1,
      image: '',
      name: 'Vault 2',
    },
  ]
}

export async function fetchSearchByAddress() {
  await mockDelay(3000)
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  return [
    {
      address: '1',
      chainId: 1,
      image: '',
      name: `Vault ${getRandomInt(100000000000)}`,
    },
    {
      address: '3',
      chainId: 1,
      image: '',
      name: `Vault ${getRandomInt(100000000000)}`,
    },
    {
      address: '2',
      chainId: 1,
      image: '',
      name: 'Vault 2',
    },
  ]
}
