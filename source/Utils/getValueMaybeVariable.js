export function getValueMaybeVariable(rawValue) {
  const value = rawValue.trim();

  if (value.startsWith('$')) {
    const variableId = parseInt(value.slice(1));
    if (isNaN(variableId)) {
      throw new Error(`Invalid Variable ID: ${ variableId }`); //`
    }

    if (variableId === 0) {
      return 0;
    }

    return $gameVariables.value(variableId);
  }

  return value;
}