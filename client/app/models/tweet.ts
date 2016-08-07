export class Tweet {
  user: {
    name: string;
    screen_name: string;
    location: string;
    profile_image_url: string;
    created_at: string;
    followers_count: string;
  };
  text: string;
  sentiment: any;  
}
