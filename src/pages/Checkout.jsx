import axios from "axios";
import { CartState } from "../context/Context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = CartState();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const name = form.name;
    const email = form.email;
    
    const userData = {
      data: {
        name,
        email,
        payment_method: 'Cash on Delivery',
        price: cart[0].price
      }
    }

    axios
      .post("http://localhost:1337/api/order", userData, {
        headers: {
          Authorization: `bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate('/thanks')
        }
      })
      .catch((error) => {
        // Handle any errors here
        toast.error("Something went wrong!");
        console.error("Submission error:", error);
      });

  }

  return (
    <>
      {cart.map((data) => (
        <div
          className="max-w-[1170px] mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
          key={data.plan}
        >
          <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Product</dt>
                <dd className="text-gray-700 sm:col-span-2">{data.plan}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Price</dt>
                <dd className="text-gray-700 sm:col-span-2">$ {data.price}</dd>
              </div>
            </dl>
          </div>
          <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
              <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                <div className="max-w-xl lg:max-w-3xl">
                  <form action="#" className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="FirstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>

                      <input
                        type="text"
                        id="FirstName"
                        name="name"
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="Email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {" "}
                        Email{" "}
                      </label>

                      <input
                        type="email"
                        id="Email"
                        name="email"
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500" type="submit">
                        Checkout
                      </button>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </section>
        </div>
      ))}
    </>
  );
};

export default Checkout;
