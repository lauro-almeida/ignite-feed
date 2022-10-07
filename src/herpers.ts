import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatCompleteDate(date: Date) {
    const formatedDate = format(date, "d 'de' LLLL 'às' HH:mm'h'", {locale: ptBR})
    return formatedDate
}

export function formatDateDistanceFromNow(date: Date, {hasSuffix = false} ) {
    const formatedDate = formatDistanceToNow(date, {
        locale: ptBR,
        addSuffix: hasSuffix
    })
    return formatedDate
}

