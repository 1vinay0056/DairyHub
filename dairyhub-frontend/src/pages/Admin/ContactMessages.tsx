import { useEffect, useState } from "react";
import { Mail, Phone, User } from "lucide-react";
import {
  getMessages,
  markAllMessagesRead,
  markAsRead as markMessageRead,
} from "../../services/contactServices";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function ContactMessages() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
const handleMarkAsRead = async (id: string) => {
  try {
    await markMessageRead(id);

    await loadMessages();

  } catch (error) {
    console.log(error);
  }
};
  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 p-0">


      <div className="space-y-5">
                {messages.length === 0 ? (

          <div className="rounded-2xl bg-white p-10 text-center shadow-lg">

            <Mail
              size={60}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-4 text-2xl font-bold">
              No Messages Found
            </h2>

            <p className="mt-2 text-gray-500">
              Contact messages will appear here.
            </p>

          </div>

        ) : (

          messages.map((item) => (

            <div
              key={item.id}
              className="rounded-2xl bg-white p-6 shadow-lg transition hover:shadow-xl"
            >

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                  <div className="flex items-center gap-2">

                    <User
                      size={18}
                      className="text-green-600"
                    />

                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                  </div>

                  <div className="mt-2 flex items-center gap-2 text-gray-600">

                    <Mail size={16} />

                    {item.email}

                  </div>

                  <div className="mt-2 flex items-center gap-2 text-gray-600">

                    <Phone size={16} />

                    {item.phone}

                  </div>

                </div>

               {!item.is_read ? (
  <button
    onClick={() => handleMarkAsRead(item.id)}
    className="rounded-full bg-yellow-100 px-6 py-3 font-semibold text-yellow-700 transition hover:bg-yellow-200"
  >
    Unread
  </button>
) : (
  <span className="rounded-full bg-green-100 px-6 py-3 font-semibold text-green-700">
    Read
  </span>
)}

              </div>

              <hr className="my-5" />

              <div>

                <h3 className="font-semibold text-green-700">
                  Subject
                </h3>

                <p className="mt-1 font-medium">
                  {item.subject}
                </p>

              </div>

              <div className="mt-5">

                <h3 className="font-semibold text-green-700">
                  Message
                </h3>

                <p className="mt-2 whitespace-pre-wrap leading-7 text-gray-700">
                  {item.message}
                </p>

              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-4">

                <span className="text-sm text-gray-500">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </span>

                <button
                  className="rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Mark as Resolved
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
}