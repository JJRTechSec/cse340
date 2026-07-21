const displayHome = async (req, res) => {
  const title = 'Home';
  res.render('home', { title });
};

export { displayHome };