import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Edit, Trash, Loader2, Upload, X, GripVertical } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TrustedClient {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  display_order: number | null;
  active: boolean | null;
}

function SortableRow({ client, onEdit, onDelete }: { client: TrustedClient; onEdit: (c: TrustedClient) => void; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: client.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <Button variant="ghost" size="icon" className="cursor-grab" {...attributes} {...listeners}>
          <GripVertical className="w-4 h-4" />
        </Button>
      </TableCell>
      <TableCell>
        {client.logo_url ? (
          <img src={client.logo_url} alt={client.name} className="h-10 w-20 object-contain" />
        ) : (
          <span className="text-muted-foreground">No logo</span>
        )}
      </TableCell>
      <TableCell className="font-medium">{client.name}</TableCell>
      <TableCell>
        {client.website_url ? (
          <a href={client.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
            {client.website_url}
          </a>
        ) : "-"}
      </TableCell>
      <TableCell>{client.active ? "Yes" : "No"}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(client)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete(client.id)}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function TrustedClientsTab() {
  const [clients, setClients] = useState<TrustedClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<TrustedClient | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo_url: "",
    website_url: "",
    active: true,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchClients();

    const channel = supabase
      .channel('trusted-clients-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trusted_clients' }, fetchClients)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from("trusted_clients")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `client-logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('knight21-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('knight21-uploads')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, logo_url: publicUrl }));
      toast.success("Logo uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Client name is required");
      return;
    }

    try {
      const clientData = {
        name: formData.name,
        logo_url: formData.logo_url || null,
        website_url: formData.website_url || null,
        active: formData.active,
        display_order: editingClient ? editingClient.display_order : clients.length,
      };

      if (editingClient) {
        const { error } = await supabase
          .from("trusted_clients")
          .update(clientData)
          .eq("id", editingClient.id);
        if (error) throw error;
        toast.success("Client updated successfully");
      } else {
        const { error } = await supabase
          .from("trusted_clients")
          .insert([clientData]);
        if (error) throw error;
        toast.success("Client added successfully");
      }

      resetForm();
      setIsOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to save client");
    }
  };

  const handleEdit = (client: TrustedClient) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      logo_url: client.logo_url || "",
      website_url: client.website_url || "",
      active: client.active ?? true,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      const { error } = await supabase
        .from("trusted_clients")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast.success("Client deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete client");
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = clients.findIndex((c) => c.id === active.id);
      const newIndex = clients.findIndex((c) => c.id === over.id);
      const newClients = arrayMove(clients, oldIndex, newIndex);
      setClients(newClients);

      // Update display_order in database
      try {
        for (let i = 0; i < newClients.length; i++) {
          await supabase
            .from("trusted_clients")
            .update({ display_order: i })
            .eq("id", newClients[i].id);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to update order");
        fetchClients();
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", logo_url: "", website_url: "", active: true });
    setEditingClient(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Trusted Clients</h2>
          <p className="text-sm text-muted-foreground">Manage client logos displayed on the homepage</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingClient ? "Edit Client" : "Add New Client"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Client Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Client company name"
                  required
                />
              </div>

              <div>
                <Label>Logo</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    placeholder="Logo URL or upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('client-logo-upload')?.click()}
                    disabled={uploading}
                  >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  </Button>
                  <input
                    id="client-logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                {formData.logo_url && (
                  <div className="mt-2 relative inline-block">
                    <img src={formData.logo_url} alt="Preview" className="h-16 object-contain bg-gray-100 rounded p-2" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => setFormData({ ...formData, logo_url: "" })}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <Label>Website URL</Label>
                <Input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://client-website.com"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
                <Label>Active</Label>
              </div>

              <Button type="submit" className="w-full">
                {editingClient ? "Update Client" : "Add Client"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Logo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SortableContext items={clients.map(c => c.id)} strategy={verticalListSortingStrategy}>
                  {clients.map((client) => (
                    <SortableRow
                      key={client.id}
                      client={client}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </SortableContext>
                {clients.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No clients yet. Click "Add Client" to add your first trusted client.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  );
}
