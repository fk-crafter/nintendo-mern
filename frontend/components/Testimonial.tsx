import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "James",
    username: "@james",
    body: "Nintendo products are simply the best! The quality and design are top-notch!",
    img: "/img/avatar1.svg",
  },
  {
    name: "Olivia",
    username: "@olivia",
    body: "I love every product I buy from Nintendo. Always innovative and reliable!",
    img: "/img/avatar2.svg",
  },
  {
    name: "Ethan",
    username: "@ethan",
    body: "The attention to detail in Nintendo products is unmatched. Absolutely worth it!",
    img: "/img/avatar3.svg",
  },
  {
    name: "Sophia",
    username: "@sophia",
    body: "Nintendo never disappoints. The quality and durability of their products are amazing!",
    img: "/img/avatar4.svg",
  },
  {
    name: "Daniel",
    username: "@daniel",
    body: "Every purchase from Nintendo feels like a premium experience. I highly recommend them!",
    img: "/img/avatar5.svg",
  },
  {
    name: "Emily",
    username: "@emily",
    body: "From accessories to consoles, Nintendo products are always a great investment!",
    img: "/img/avatar6.svg",
  },
  {
    name: "William",
    username: "@william",
    body: "Nintendo keeps raising the bar in gaming. Their consoles and games are legendary!",
    img: "/img/avatar7.svg",
  },
  {
    name: "Charlotte",
    username: "@charlotte",
    body: "The joy Nintendo brings is priceless. Their products are fun, durable, and family-friendly!",
    img: "/img/avatar8.svg",
  },
  {
    name: "Benjamin",
    username: "@benjamin",
    body: "I've been a Nintendo fan for years, and they never fail to impress with innovation and quality!",
    img: "/img/avatar9.svg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
const thirdRow = reviews.slice(0, reviews.length / 2);
const fourthRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full w-8 h-8"
          src={img}
          alt={name}
          width={32}
          height={32}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm font-serif italic">{body}</blockquote>
    </figure>
  );
};

export function Testimonial() {
  return (
    <div className="relative w-full overflow-hidden text-center pb-16">
      <div className="mb-8 ">
        <h2 className="text-3xl font-bold dark:text-white">
          What Our Customers Say
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Discover why collectors love our exclusive products.
        </p>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center">
        <Marquee pauseOnHover className="[--duration:25s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>

      <div className="flex md:hidden flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px] h-96">
        <div
          className="flex flex-row items-center gap-5"
          style={{
            transform:
              "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
          }}
        >
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
            {thirdRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:20s]" vertical>
            {fourthRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-700 mt-8"></div>
    </div>
  );
}
