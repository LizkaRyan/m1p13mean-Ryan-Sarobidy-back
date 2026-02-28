const formatDate = (date) => {
  const d = new Date(date);

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(d);
}

module.exports = { formatDate };