export const meta = () => {
  return [
    {
      title: "remix-antd-amdin",
    },
  ];
};

export default function HomePage() {
  return (
    <div className="flex justify-center items-center">
      <div className="">
        <div
          className="hero w-[100vw] h-[100vh]"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/17485709/pexels-photo-17485709.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="">
              <h1 className="mb-5 text-5xl font-bold">Remix Antd Admin</h1>
              <p className="mb-5">
                A lightweight content management system, not limited to content
                management.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
