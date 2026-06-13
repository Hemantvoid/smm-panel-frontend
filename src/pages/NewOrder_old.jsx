import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Search,
  Layers3,
  ChevronRight,
} from "lucide-react";

import api from "../axios";

import toast from "react-hot-toast";

export default function NewOrder() {

  const [services, setServices] =
    useState([]);

  const [balance, setBalance] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("All");

  const [search, setSearch] =
    useState("");

  const [
    selectedService,
    setSelectedService
  ] = useState(null);

  const [form, setForm] =
    useState({
      serviceId: "",
      quantity: "",
      link: "",
      comments: "",
    });

  // LOAD
  useEffect(() => {

    const load = async () => {

      try {

        const [
          serviceRes,
          balRes,
        ] = await Promise.all([

          api.get("/services"),

          api.get(
            "/wallet/balance"
          ),

        ]);

        setServices(
          serviceRes.data
        );

        setBalance(
          balRes.data
        );

      } catch {

        toast.error(
          "Failed to load services"
        );
      }
    };

    load();

  }, []);

  // CATEGORY CLEANER
  const extractCategory =
    (category) => {

      if (!category)
        return "Other";

      return category
        .split("-")[0]
        .trim();
    };

  // CATEGORIES
  const categories = [

    "All",

    ...new Set(

      services.map((s) =>

        extractCategory(
          s.category
        )

      )

    ),

  ];

  // FILTERED SERVICES
  const filteredServices =
    services.filter((s) => {

      const categoryMatch =

        selectedCategory ===
        "All"

          ? true

          : extractCategory(
              s.category
            ) ===
            selectedCategory;

      const searchMatch =
        s.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        categoryMatch &&
        searchMatch
      );
    });

  // SELECT
  const handleSelectService =
    (service) => {

      setSelectedService(
        service
      );

      setForm({
        ...form,
        serviceId:
          service.id,
      });
    };

  // PRICE
  const totalPrice =

    selectedService &&
    form.quantity

      ? (
          form.quantity / 1000
        ) *
        selectedService.sellPrice

      : 0;

  // VALIDATION
  const isInvalid =

    !selectedService ||

    !form.link ||

    !form.quantity ||

    totalPrice > balance;

  // CREATE
  const handleCreate =
    async () => {

      try {

        if (isInvalid) {

          return toast.error(
            "Invalid order"
          );
        }

        setLoading(true);

        await api.post(
          "/orders",
          form
        );

        toast.success(
          "Order placed successfully"
        );

        setSelectedService(
          null
        );

        setForm({
          serviceId: "",
          quantity: "",
          link: "",
          comments: "",
        });

      } catch {

        toast.error(
          "Failed to create order"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        max-w-7xl
        mx-auto
        space-y-6
      "
    >

      {/* HEADER */}
      <div className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
      ">

        <div>

          <h1 className="
            text-4xl
            font-black
            text-white
            mb-2
          ">

            New Order

          </h1>

          <p className="
            text-slate-400
          ">

            Place high quality
            social media orders

          </p>

        </div>

        {/* SEARCH */}
        <div className="
          relative
          w-full
          lg:w-[350px]
        ">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />

          <input

            placeholder="Search services..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            className="
              w-full
              bg-slate-900/80
              border border-white/10
              rounded-2xl
              pl-11
              pr-4
              py-3
              text-white
              outline-none
              focus:border-indigo-500
            "
          />

        </div>

      </div>

      {/* CATEGORY BAR */}
      <div className="
        flex
        gap-3
        overflow-x-auto
        pb-2
      ">

        {categories.map((cat) => (

          <button

            key={cat}

            onClick={() =>
              setSelectedCategory(
                cat
              )
            }

            className={`
              whitespace-nowrap
              px-5
              py-3
              rounded-2xl
              text-sm
              font-medium
              transition

              ${
                selectedCategory ===
                cat

                ? "bg-indigo-600 text-white"

                : "bg-white/5 text-slate-300 hover:bg-white/10"
              }
            `}
          >

            {cat}

          </button>

        ))}

      </div>

      {/* SERVICES */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-5
      ">

        {filteredServices.map(
          (service) => (

            <motion.div

              key={service.id}

              whileHover={{
                y: -4,
              }}

              onClick={() =>
                handleSelectService(
                  service
                )
              }

              className={`
                rounded-3xl
                border
                p-6
                cursor-pointer
                transition
                backdrop-blur-xl
                min-h-[340px]
                flex
                flex-col
                justify-between

                ${
                  selectedService?.id ===
                  service.id

                    ? "border-indigo-500 bg-indigo-500/10"

                    : "border-white/10 bg-white/5 hover:border-indigo-500/30"
                }
              `}
            >

              <div>

                {/* CATEGORY */}
                <div className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-1.5
                  rounded-full
                  bg-indigo-500/10
                  text-indigo-300
                  text-sm
                  mb-5
                ">

                  <Layers3
                    size={14}
                  />

                  {extractCategory(
                    service.category
                  )}

                </div>

                {/* NAME */}
                <h3 className="
                  text-lg
                  font-bold
                  text-white
                  leading-8
                  break-words
                  mb-5
                ">

                  {service.name}

                </h3>

              </div>

              <div>

                {/* PRICE */}
                <div className="
                  flex
                  items-end
                  gap-2
                  mb-5
                ">

                  <span className="
                    text-4xl
                    font-black
                    text-green-400
                  ">

                    ₹
                    {service.sellPrice?.toFixed(
                      2
                    )}

                  </span>

                  <span className="
                    text-slate-400
                    mb-1
                  ">

                    /1000

                  </span>

                </div>

                {/* LIMITS */}
                <div className="
                  flex
                  justify-between
                  text-sm
                  text-slate-400
                  mb-6
                ">

                  <span>
                    Min:
                    {" "}
                    {service.min}
                  </span>

                  <span>
                    Max:
                    {" "}
                    {service.max}
                  </span>

                </div>

                <button className="
                  w-full
                  py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-600
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                ">

                  Select Service

                  <ChevronRight
                    size={18}
                  />

                </button>

              </div>

            </motion.div>

          )
        )}

      </div>

      {/* ORDER FORM */}
      {selectedService && (

        <div className="
          rounded-3xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          p-8
        ">

          <h2 className="
            text-3xl
            font-bold
            text-white
            mb-6
          ">

            Order Details

          </h2>

          <div className="
            grid
            lg:grid-cols-2
            gap-6
          ">

            <div className="
              space-y-5
            ">

              <input

                placeholder="Enter target link"

                value={form.link}

                onChange={(e) =>
                  setForm({
                    ...form,
                    link:
                      e.target.value,
                  })
                }

                className="
                  w-full
                  bg-slate-900/80
                  border border-white/10
                  rounded-2xl
                  p-4
                  text-white
                "
              />

              <input

                type="number"

                placeholder="Quantity"

                value={form.quantity}

                onChange={(e) =>
                  setForm({
                    ...form,
                    quantity:
                      Number(
                        e.target.value
                      ),
                  })
                }

                className="
                  w-full
                  bg-slate-900/80
                  border border-white/10
                  rounded-2xl
                  p-4
                  text-white
                "
              />

              <textarea

                rows={5}

                placeholder="Comments"

                value={form.comments}

                onChange={(e) =>
                  setForm({
                    ...form,
                    comments:
                      e.target.value,
                  })
                }

                className="
                  w-full
                  bg-slate-900/80
                  border border-white/10
                  rounded-2xl
                  p-4
                  text-white
                  resize-none
                "
              />

            </div>

            <div className="
              rounded-3xl
              bg-slate-900/60
              border border-white/10
              p-6
              space-y-4
            ">

              <SummaryItem
                label="Service"
                value={
                  selectedService.name
                }
              />

              <SummaryItem
                label="Price"
                value={`₹${selectedService.sellPrice}`}
              />

              <SummaryItem
                label="Balance"
                value={`₹${balance}`}
              />

              <SummaryItem
                label="Minimum"
                value={
                  selectedService.min
                }
              />

              <SummaryItem
                label="Maximum"
                value={
                  selectedService.max
                }
              />

              <div className="
                border-t
                border-white/10
                pt-5
                flex
                justify-between
              ">

                <span className="
                  text-slate-400
                ">
                  Total
                </span>

                <span className="
                  text-3xl
                  font-black
                  text-green-400
                ">

                  ₹
                  {totalPrice.toFixed(
                    2
                  )}

                </span>

              </div>

              <button

                disabled={
                  isInvalid ||
                  loading
                }

                onClick={
                  handleCreate
                }

                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-500
                  to-purple-600
                  font-bold
                  text-white
                  disabled:opacity-50
                "
              >

                {loading
                  ? "Processing..."
                  : "Place Order"}

              </button>

            </div>

          </div>

        </div>

      )}

    </motion.div>
  );
}

function SummaryItem({
  label,
  value,
}) {

  return (

    <div className="
      flex
      justify-between
      gap-5
    ">

      <span className="
        text-slate-400
      ">
        {label}
      </span>

      <span className="
        text-white
        font-semibold
        text-right
      ">
        {value}
      </span>

    </div>

  );
}