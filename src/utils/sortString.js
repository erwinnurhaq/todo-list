const { compare } = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

export default compare;
