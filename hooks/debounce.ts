let timeout: NodeJS.Timeout

const debounce = (fn: () => void, delay: number = 500) => {
    clearTimeout(timeout)
    timeout = setTimeout(fn, delay)
}

export default debounce