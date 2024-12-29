export interface BedsList {
    available: number
    bed_class: string
    room_name: string
    info: string
  }

  export interface BedDetail {
    time: string
    stats: {
      title: string
      bed_empty: number
      bed_available: number
      queue: number
    }
  }
  
  export interface ResponseBedDetail {
    status: number
    data: {
      id: string
      name: string
      address: string
      phone: string | null
      bedDetail: BedDetail[]
    }
  }