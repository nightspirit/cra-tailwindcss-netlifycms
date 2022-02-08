import {
  FacebookIcon,
  TwitterIcon,
  GithubIcon,
  InstagramIcon,
  YoutubeIcon,
  MediumIcon,
  LinkedinIcon,
  LinkIcon,
} from "components/Icons";

// icon mapping
const socialIcons = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  github: GithubIcon,
  youtube: YoutubeIcon,
  medium: MediumIcon,
  linkedin: LinkedinIcon,
};

const Link = ({ type, href }) => {
  let Icon = socialIcons[type] || LinkIcon; // default as LinkIcon
  return (
    <a className="link" href={href}>
      <Icon className="h-6 fill-current text-gray-600 hover:text-green-700" />
    </a>
  );
};

const Socials = ({ socials, ...restProps }) => {
  return (
    <div {...restProps}>
      {socials.map((props, key) => (
        <Link key={key} {...props} />
      ))}
    </div>
  );
};

export default Socials;
