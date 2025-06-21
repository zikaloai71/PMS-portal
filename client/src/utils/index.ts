
export interface FormErrors {
  [key: string]: string | undefined
}

// Date utilities
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

export function formatShortDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}

export function isDateInPast(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

export function isDateInFuture(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return date > today
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const startDate = new Date(checkIn)
  const endDate = new Date(checkOut)
  const timeDiff = endDate.getTime() - startDate.getTime()
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateBookingDates(checkIn: string, checkOut: string): FormErrors {
  const errors: FormErrors = {}
  
  if (!checkIn) {
    errors.checkIn = 'Check-in date is required'
  } else if (isDateInPast(checkIn)) {
    errors.checkIn = 'Check-in date cannot be in the past'
  }
  
  if (!checkOut) {
    errors.checkOut = 'Check-out date is required'
  } else if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
    errors.checkOut = 'Check-out date must be after check-in date'
  }
  
  return errors
}

export function validateRequired(value: string, fieldName: string): string | undefined {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`
  }
  return undefined
}

// Formatting utilities
export function formatCurrency(amount: number, currency = 'USD'): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  } catch {
    return `$${amount.toFixed(2)}`
  }
}

export function formatPropertyType(type: string): string {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}






