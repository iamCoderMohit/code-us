export interface canvas {
    name: string,
    id: string
}

export interface member {
    owner: {
        name: string,
        fullName: string
    }
}

export interface room {
    id: string,
    owner: {
        fullName: string
    },
    inviteCode: string
}

export interface user {
    email: string
}

export interface searchRoom {
    id: string,
    owner: {
        fullName: string
    },
    inviteCode: string
}