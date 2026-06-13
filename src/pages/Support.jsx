import {
  MessageCircle,
  Send,
  Mail,
  Clock3,
  ShieldCheck,
  Headphones,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import api from "../axios";

import toast from "react-hot-toast";

export default function Support() {

  const [tickets, setTickets] =
    useState([]);

  const [form, setForm] =
    useState({
      subject: "",
      message: "",
    });

  const cards = [

    {
      title: "Telegram Support",
      value: "@smmguru",
      icon: Send,
      color:
        "from-sky-500 to-cyan-500",
    },

    {
      title: "WhatsApp",
      value: "+91 9876543210",
      icon: MessageCircle,
      color:
        "from-green-500 to-emerald-500",
    },

    {
      title: "Email Support",
      value:
        "support@smmguru.com",
      icon: Mail,
      color:
        "from-pink-500 to-rose-500",
    },

    {
      title: "Average Response",
      value: "5 - 15 mins",
      icon: Clock3,
      color:
        "from-yellow-500 to-orange-500",
    },

  ];

  const loadTickets =
    async () => {

      try {

        const res =
          await api.get(
            "/support"
          );

        setTickets(
          res.data
        );

      } catch (err) {

        console.error(err);
      }
    };

  useEffect(() => {

    loadTickets();

  }, []);

  const createTicket =
    async () => {

      try {

        if (
          !form.subject ||
          !form.message
        ) {

          return toast.error(
            "Fill all fields"
          );
        }

        await api.post(
          "/support",
          form
        );

        toast.success(
          "Ticket created successfully"
        );

        setForm({
          subject: "",
          message: "",
        });

        loadTickets();

      } catch(err) {

        toast.error(
  err?.response?.data?.message ||
  "Something went wrong"
);
      }
    };

  return (

    <div className="p-6 lg:p-10 text-white">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="
          text-5xl
          font-black
          tracking-tight
          mb-3
        ">
          Support Center
        </h1>

        <p className="
          text-slate-400
          text-lg
          max-w-2xl
        ">
          Need help with orders,
          payments or services?
          Contact our support team
          anytime.
        </p>

      </div>

      {/* TOP CARDS */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-10
      ">

        {cards.map((card, i) => {

          const Icon = card.icon;

          return (

            <div
              key={i}
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
              "
            >

              <div
                className={`
                  absolute
                  inset-0
                  opacity-10
                  bg-gradient-to-br
                  ${card.color}
                `}
              />

              <div className="
                relative
                z-10
              ">

                <div
                  className={`
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    ${card.color}
                    flex
                    items-center
                    justify-center
                    mb-5
                  `}
                >

                  <Icon size={28} />

                </div>

                <h3 className="
                  text-slate-400
                  text-sm
                  mb-2
                ">
                  {card.title}
                </h3>

                <p className="
                  text-2xl
                  font-bold
                ">
                  {card.value}
                </p>

              </div>

            </div>

          );

        })}

      </div>

      {/* INFO SECTION */}
      <div className="
        grid
        lg:grid-cols-2
        gap-8
        mb-10
      ">

        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
        ">

          <div className="
            flex
            items-center
            gap-4
            mb-8
          ">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-purple-600
              flex
              items-center
              justify-center
            ">

              <Headphones
                size={30}
              />

            </div>

            <div>

              <h2 className="
                text-3xl
                font-bold
              ">
                Premium Support
              </h2>

              <p className="
                text-slate-400
              ">
                Fast issue resolution
              </p>

            </div>

          </div>

          <div className="
            space-y-4
            text-slate-300
          ">

            <p>
              • Order issue resolution
            </p>

            <p>
              • Payment assistance
            </p>

            <p>
              • Refill requests
            </p>

            <p>
              • Cancellation support
            </p>

            <p>
              • Provider troubleshooting
            </p>

          </div>

        </div>

        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
        ">

          <div className="
            flex
            items-center
            gap-4
            mb-8
          ">

            <div className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-br
              from-green-500
              to-emerald-600
              flex
              items-center
              justify-center
            ">

              <ShieldCheck
                size={30}
              />

            </div>

            <div>

              <h2 className="
                text-3xl
                font-bold
              ">
                Service Status
              </h2>

              <p className="
                text-slate-400
              ">
                All systems operational
              </p>

            </div>

          </div>

          <div className="
            space-y-4
          ">

            <div className="
              flex
              justify-between
            ">
              <span>
                API Servers
              </span>

              <span className="
                text-green-400
                font-bold
              ">
                ONLINE
              </span>
            </div>

            <div className="
              flex
              justify-between
            ">
              <span>
                Payments
              </span>

              <span className="
                text-green-400
                font-bold
              ">
                ACTIVE
              </span>
            </div>

            <div className="
              flex
              justify-between
            ">
              <span>
                Tickets
              </span>

              <span className="
                text-green-400
                font-bold
              ">
                RUNNING
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* TICKET SYSTEM */}
      <div className="
        grid
        lg:grid-cols-2
        gap-8
      ">

        {/* CREATE */}
        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-6
          ">
            Create Ticket
          </h2>

          <div className="
            space-y-4
          ">

            <input
              placeholder="Subject"
              value={form.subject}
              onChange={(e) =>
                setForm({
                  ...form,
                  subject:
                    e.target.value,
                })
              }
              className="
                w-full
                p-4
                rounded-2xl
                bg-slate-900
              "
            />

            <textarea
              rows={5}
              placeholder="Describe your issue"
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message:
                    e.target.value,
                })
              }
              className="
                w-full
                p-4
                rounded-2xl
                bg-slate-900
              "
            />

            <button
              onClick={
                createTicket
              }
              className="
                w-full
                py-3
                rounded-2xl
                bg-indigo-600
                hover:bg-indigo-700
              "
            >
              Create Ticket
            </button>

          </div>

        </div>

        {/* MY TICKETS */}
        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-6
          ">
            My Tickets
          </h2>

          <div className="
            space-y-4
          ">

            {tickets.length === 0 && (

              <div className="
                text-slate-400
              ">
                No tickets found
              </div>

            )}

            {tickets.map(
              (ticket) => (

                <div
                  key={ticket.id}
                  className="
                    p-4
                    rounded-2xl
                    bg-slate-900
                  "
                >

                  <div className="
                    flex
                    justify-between
                    mb-2
                  ">

                    <h3 className="
                      font-bold
                    ">
                      {ticket.subject}
                    </h3>

                    <span
                      className={
                        ticket.status ===
                        "OPEN"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {ticket.status}
                    </span>

                  </div>

                  <p className="
                    text-slate-400
                  ">
                    {ticket.message}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  );
}