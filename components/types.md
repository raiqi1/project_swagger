const handleTypeChange = (type) => {
  setSelectedTypes((prev) => {
    if (prev[type]) {
      const { [type]: omit, ...rest } = prev;
      return rest;
    } else {
      return { ...prev, [type]: true };
    }
  });
};