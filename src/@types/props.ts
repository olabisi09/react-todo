type BaseProps = {
    id?: string | number,
    className?: string,
    key?: string | number
}

export type CardDto = {
    name: string,
    description: string
}

export type CustomCardProps = BaseProps & Partial<CardDto> & {
    handlePush?: (data?:any) => void;
    editTask?: (data?:any) => void;
    deleteTask?: (data?:any) => void;
    setShow?: (data?:any) => void;
}