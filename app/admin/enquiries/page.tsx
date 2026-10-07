import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"

type Enquiry = {
  _id: string
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  product?: string
  productSlug?: string
  model?: string
  createdAt?: string
}

export default async function EnquiriesPage() {
  const client = await clientPromise

  const db = client.db("crystal_vmm")

  const enquiries = await db
    .collection("enquiries")
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  const formattedEnquiries: Enquiry[] = enquiries.map((item) => ({
    _id: item._id.toString(),
    name: item.name || "",
    email: item.email || "",
    phone: item.phone || "",
    company: item.company || "",
    message: item.message || "",
    product: item.product || "",
    productSlug: item.productSlug || "",
    model: item.model || "",
    createdAt: item.createdAt
      ? new Date(item.createdAt).toISOString()
      : "",
  }))

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Crystal VMM Admin
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-mono text-3xl font-black uppercase tracking-[-0.04em] sm:text-5xl">
                Enquiries
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Customer quotation requests received from the
                Crystal VMM website.
              </p>
            </div>

            <div className="border border-border bg-secondary px-5 py-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Total enquiries
              </p>

              <p className="mt-1 font-mono text-2xl font-black text-primary">
                {formattedEnquiries.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiries */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {formattedEnquiries.length === 0 ? (
          <div className="border border-border bg-background px-6 py-16 text-center">
            <p className="font-mono text-sm font-bold uppercase tracking-widest">
              No enquiries yet
            </p>

            <p className="mt-3 text-sm text-muted-foreground">
              Customer enquiries will appear here after someone
              submits the contact form.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {formattedEnquiries.map((enquiry) => (
              <article
                key={enquiry._id}
                className="overflow-hidden border border-border bg-background"
              >
                {/* Enquiry header */}
                <div className="flex flex-col justify-between gap-4 border-b border-border bg-secondary px-6 py-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Customer
                    </p>

                    <h2 className="mt-1 font-mono text-lg font-bold uppercase">
                      {enquiry.name}
                    </h2>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Submitted
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      {enquiry.createdAt
                        ? new Date(enquiry.createdAt).toLocaleString(
                            "en-IN",
                            {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }
                          )
                        : "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Customer information */}
                <div className="grid gap-6 border-b border-border p-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Email
                    </p>

                    <p className="mt-2 break-all text-sm font-semibold">
                      {enquiry.email}
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Phone
                    </p>

                    <p className="mt-2 text-sm font-semibold">
                      {enquiry.phone || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Company
                    </p>

                    <p className="mt-2 text-sm font-semibold">
                      {enquiry.company || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Model
                    </p>

                    <p className="mt-2 font-mono text-sm font-bold text-primary">
                      {enquiry.model || "Not selected"}
                    </p>
                  </div>
                </div>

                {/* Product */}
                <div className="border-b border-border p-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Product
                  </p>

                  <p className="mt-2 text-sm font-bold">
                    {enquiry.product || "Not selected"}
                  </p>
                </div>

                {/* Message */}
                <div className="p-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Customer message
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7">
                    {enquiry.message || "No message provided"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}