import React from 'react';
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import blogData from '@lib/blogdata';
import commerce from '@lib/api/commerce';
import s from './blog.module.scss';
import Logo from './img.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { basicVariants, MotionParent } from '@/components/common/MotionItems';

export async function getStaticProps({ params }: GetStaticPropsContext<any>) {
  const blog = blogData.find(({ slug }) => slug === params.slug)!;

  console.log('blog-slug---------------- : ', blog);

  return {
    props: {
      blog,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths({}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const paths = blogData.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

const bgVariants = {
  initial: { y: '-60%' },
  animate: { y: 0 },
};

const titleVariants = {
  initial: { y: '100%' },
  animate: { y: 0 },
};

const transition = {
  duration: 1.3,
  ease: [1, 0, 0.68, 1],
};

export const Blog: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ blog }) => {
  return (
    <MotionParent>
      <div className="blog_wrapper">
        <motion.header>
          <motion.div className="bg" variants={bgVariants} transition={transition} />

          <div className="wrapper">
            <motion.div className="center" variants={titleVariants} transition={transition}>
              <h1>{blog?.title}</h1>
              <div className="meta">
                <Image src={Logo} alt="logo" />
                <div className="col">
                  <p>Posted by The Bottle Haus</p>
                  <small>Created: {blog?.date}</small>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.header>
        <motion.div
          variants={basicVariants}
          transition={{ ...transition, delay: 0.2 }}
          className="content"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
      </div>
    </MotionParent>
  );
};

export default Blog;
