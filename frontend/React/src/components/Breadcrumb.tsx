
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="md:mb-[20px] mb-[18px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="font-[600] text-[#1D2D5C] dark:text-white leading-[28px] text-[20px]">
        {pageName}
      </h2>

    </div>
  );
};

export default Breadcrumb;