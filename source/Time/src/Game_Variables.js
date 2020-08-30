if (CycloneTime.usingVariables()) {
  CycloneTime.patchClass(Game_Variables, $super => class {
    setValue(variableId, value) {
      $super.setValue.call(this, variableId, value);

      switch (variableId) {
        case CycloneTime.params.variables.second:
          return CycloneTime.setSecond(value);
        case CycloneTime.params.variables.minute:
          return CycloneTime.setMinute(value);
        case CycloneTime.params.variables.hour:
          return CycloneTime.setHour(value);
        case CycloneTime.params.variables.day:
          return CycloneTime.setDay(value);
        case CycloneTime.params.variables.month:
          return CycloneTime.setMonth(value);
        case CycloneTime.params.variables.year:
          return CycloneTime.setYear(value);
      }
    }
  });
}
