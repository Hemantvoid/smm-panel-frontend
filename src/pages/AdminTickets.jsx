import { useEffect, useState } from "react";
import api from "../axios";
import toast from "react-hot-toast";

export default function AdminTickets() {

  const [tickets, setTickets] =
    useState([]);

  const loadTickets =
    async () => {

      try {

        const res =
          await api.get(
            "/support/admin"
          );

        setTickets(
          res.data
        );

      } catch (err) {

        toast.error(
          err?.response?.data?.message ||
          "Failed to load tickets"
        );
      }
    };

  useEffect(() => {

    loadTickets();

  }, []);

  const closeTicket =
    async (id) => {

      try {

        await api.put(
          `/support/${id}/close`
        );

        toast.success(
          "Ticket closed"
        );

        loadTickets();

      } catch (err) {

        toast.error(
          err?.response?.data?.message ||
          "Failed"
        );
      }
    };

  return (

    <div className="p-6 text-white">

      <div className="
        flex
        justify-between
        items-center
        mb-6
      ">

        <h1 className="
          text-3xl
          font-bold
        ">
          Support Tickets
        </h1>

        <span className="
          px-4
          py-2
          rounded-xl
          bg-indigo-600
        ">

          {tickets.length}
          {" "}
          Tickets

        </span>

      </div>

      <div className="
        overflow-x-auto
      ">

        <table className="
          w-full
          bg-slate-900
          rounded-2xl
          overflow-hidden
        ">

          <thead>

            <tr className="
              bg-slate-800
            ">

              <th className="p-4">
                ID
              </th>

              <th>
                User
              </th>

              <th>
                Subject
              </th>

              <th>
                Status
              </th>

              <th>
                Date
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {tickets.map(
              (ticket) => (

                <tr
                  key={ticket.id}
                  className="
                    border-b
                    border-slate-700
                    text-center
                  "
                >

                  <td className="p-4">
                    {ticket.id}
                  </td>

                  <td>
                    {ticket.username}
                  </td>

                  <td>
                    {ticket.subject}
                  </td>

                  <td>

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

                  </td>

                  <td>
                    {
                      ticket.createdAt
                    }
                  </td>

                  <td>

                    {ticket.status ===
                      "OPEN" && (

                      <button

                        onClick={() =>
                          closeTicket(
                            ticket.id
                          )
                        }

                        className="
                          px-3
                          py-2
                          rounded-lg
                          bg-red-600
                        "
                      >

                        Close

                      </button>

                    )}

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}