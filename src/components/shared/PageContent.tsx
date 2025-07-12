interface PageContentProps {
  children: React.ReactNode;
  title: string;
}

function PageContent({ children, title }: PageContentProps) {
  return (
    <section className="flex justify-center">
      <div className="bg-blue-100 w-lg md:w-2xl lg:w-4xl p-5 rounded-lg shadow-lg sm:m-5 mt-10">
        <header>
          <h1 className="text-center text-3xl">
            {title}
          </h1>
        </header>
          <div className="flex flex-col justify-center mt-5 gap-5">
            <div className="border-b-4 rounded"></div>
            {children}
          </div>
        </div>
    </section>
  );
}

export default PageContent;