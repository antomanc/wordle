export const customShouldForwardProp = (prop: string): boolean => {
  return prop[0] !== '$'
}
