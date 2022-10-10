import { Container, Grid, Typography, TypographyVariant } from '@mui/material';
import { useAppLanguage } from '../../hooks';
import HomeFeaturedPost from './items/HomeFeaturedPost';
import HomeFeaturedPosts from './items/HomeFeaturedPosts';
import HomeSidebar from './items/HomeSidebar';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

function Home() {
  const { Strings } = useAppLanguage();

  const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
    linkText: Strings.continue_reading
  };

  const featuredPosts = [
    {
      title: 'Featured post',
      date: 'Nov 12',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageLabel: 'Image Text'
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageLabel: 'Image Text'
    }
  ];

  const sidebar = {
    title: Strings.about,
    description:
      'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
      { title: 'March 2020', url: '#' },
      { title: 'February 2020', url: '#' },
      { title: 'January 2020', url: '#' },
      { title: 'November 1999', url: '#' },
      { title: 'October 1999', url: '#' },
      { title: 'September 1999', url: '#' },
      { title: 'August 1999', url: '#' },
      { title: 'July 1999', url: '#' },
      { title: 'June 1999', url: '#' },
      { title: 'May 1999', url: '#' },
      { title: 'April 1999', url: '#' }
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'Twitter', icon: TwitterIcon },
      { name: 'Facebook', icon: FacebookIcon }
    ]
  };

  return (
    <Container sx={{ my: 3 }} maxWidth='lg'>
      <HomeFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <HomeFeaturedPosts key={post.title} post={post} />
        ))}
      </Grid>
      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Typography sx={{ my: 4 }}>Hello kopi2tes e21e2 222221</Typography>
          <Typography sx={{ my: 4 }}>I'm a good man I'm a good man I'm a good man</Typography>
          <Typography sx={{ my: 4 }}>I'm a good man I'm a good man I'm a good man</Typography>
          <Typography sx={{ my: 4 }}>I'm a good man I'm a good man I'm a good man</Typography>
          <Typography sx={{ my: 4 }}>I'm a good man I'm a good man I'm a good man</Typography>
          <Typography sx={{ my: 4 }}>I'm a good man I'm a good man I'm a good man</Typography>
          <Typography sx={{ my: 4 }}>I'm a good man I'm a good man I'm a good man</Typography>
          <Typography sx={{ my: 4 }}>I'm a good man I'm a good man I'm a good man</Typography>
          <Typography sx={{ my: 4 }}>I'm a good man I'm a good man I'm a good man</Typography>
          <Typography sx={{ my: 4 }}>I'm a good man I'm a good man I'm a good man</Typography>
          <Typography sx={{ my: 4 }}>I'm a good man I'm a good man I'm a good man</Typography>
          <Typography sx={{ my: 4 }}>I'm a good man I'm a good man I'm a good man</Typography>
        </Grid>
        <HomeSidebar title={sidebar.title} description={sidebar.description} archives={sidebar.archives} social={sidebar.social} />
      </Grid>
    </Container>
  );
}

export default Home;
