import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface AppType {
  id: string;
  name: string;
  display_order: number | null;
  active: boolean;
}

interface AppExample {
  id: string;
  app_type_id: string;
  name: string;
  display_order: number | null;
  active: boolean;
}

function SortableTypeItem({ type, onEdit, onDelete }: { type: AppType; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: type.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-3 bg-background/50 rounded-lg border border-border">
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{type.name}</p>
      </div>
      <Button size="sm" variant="outline" onClick={onEdit}>
        <Edit className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="destructive" onClick={onDelete}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

function SortableExampleItem({ example, onEdit, onDelete }: { example: AppExample; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: example.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-2 bg-background/30 rounded border border-border/50">
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>
      <span className="flex-1 text-sm">{example.name}</span>
      <Button size="sm" variant="ghost" onClick={onEdit}>
        <Edit className="w-3 h-3" />
      </Button>
      <Button size="sm" variant="ghost" onClick={onDelete}>
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
}

export function AppDevelopmentTab() {
  const [appTypes, setAppTypes] = useState<AppType[]>([]);
  const [appExamples, setAppExamples] = useState<AppExample[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [editingType, setEditingType] = useState<AppType | null>(null);
  const [editingExample, setEditingExample] = useState<AppExample | null>(null);
  const [typeDialogOpen, setTypeDialogOpen] = useState(false);
  const [exampleDialogOpen, setExampleDialogOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [exampleName, setExampleName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchAppTypes();
  }, []);

  useEffect(() => {
    if (selectedType) {
      fetchAppExamples(selectedType);
    }
  }, [selectedType]);

  const fetchAppTypes = async () => {
    const { data, error } = await supabase
      .from("app_types")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false });

    if (error) {
      toast.error("Failed to fetch app types");
      return;
    }
    setAppTypes(data || []);
  };

  const fetchAppExamples = async (typeId: string) => {
    const { data, error } = await supabase
      .from("app_examples")
      .select("*")
      .eq("app_type_id", typeId)
      .order("display_order", { ascending: true, nullsFirst: false });

    if (error) {
      toast.error("Failed to fetch examples");
      return;
    }
    setAppExamples(data || []);
  };

  const handleSaveType = async () => {
    if (!typeName.trim()) {
      toast.error("Please enter a type name");
      return;
    }

    if (editingType) {
      const { error } = await supabase
        .from("app_types")
        .update({ name: typeName })
        .eq("id", editingType.id);

      if (error) {
        toast.error("Failed to update type");
        return;
      }
      toast.success("Type updated successfully");
    } else {
      const { error } = await supabase
        .from("app_types")
        .insert({ name: typeName, display_order: appTypes.length });

      if (error) {
        toast.error("Failed to create type");
        return;
      }
      toast.success("Type created successfully");
    }

    setTypeDialogOpen(false);
    setTypeName("");
    setEditingType(null);
    fetchAppTypes();
  };

  const handleDeleteType = async (id: string) => {
    const { error } = await supabase.from("app_types").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete type");
      return;
    }
    toast.success("Type deleted successfully");
    fetchAppTypes();
    if (selectedType === id) {
      setSelectedType(null);
    }
  };

  const handleSaveExample = async () => {
    if (!exampleName.trim()) {
      toast.error("Please enter an example name");
      return;
    }

    if (!selectedType) {
      toast.error("Please select a type first");
      return;
    }

    if (editingExample) {
      const { error } = await supabase
        .from("app_examples")
        .update({ name: exampleName })
        .eq("id", editingExample.id);

      if (error) {
        toast.error("Failed to update example");
        return;
      }
      toast.success("Example updated successfully");
    } else {
      const { error } = await supabase
        .from("app_examples")
        .insert({ 
          name: exampleName, 
          app_type_id: selectedType,
          display_order: appExamples.length 
        });

      if (error) {
        toast.error("Failed to create example");
        return;
      }
      toast.success("Example created successfully");
    }

    setExampleDialogOpen(false);
    setExampleName("");
    setEditingExample(null);
    fetchAppExamples(selectedType);
  };

  const handleDeleteExample = async (id: string) => {
    const { error } = await supabase.from("app_examples").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete example");
      return;
    }
    toast.success("Example deleted successfully");
    if (selectedType) {
      fetchAppExamples(selectedType);
    }
  };

  const handleDragEndTypes = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = appTypes.findIndex((t) => t.id === active.id);
      const newIndex = appTypes.findIndex((t) => t.id === over.id);
      const newOrder = arrayMove(appTypes, oldIndex, newIndex);
      setAppTypes(newOrder);

      // Update display_order in database
      const updates = newOrder.map((type, index) => 
        supabase.from("app_types").update({ display_order: index }).eq("id", type.id)
      );
      await Promise.all(updates);
      toast.success("Order updated");
    }
  };

  const handleDragEndExamples = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = appExamples.findIndex((e) => e.id === active.id);
      const newIndex = appExamples.findIndex((e) => e.id === over.id);
      const newOrder = arrayMove(appExamples, oldIndex, newIndex);
      setAppExamples(newOrder);

      // Update display_order in database
      const updates = newOrder.map((example, index) => 
        supabase.from("app_examples").update({ display_order: index }).eq("id", example.id)
      );
      await Promise.all(updates);
      toast.success("Order updated");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">App Development Management</h2>
        <Dialog open={typeDialogOpen} onOpenChange={setTypeDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingType(null); setTypeName(""); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add App Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingType ? "Edit" : "Add"} App Type</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="App Type Name"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
              />
              <Button onClick={handleSaveType} className="w-full">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">App Types</h3>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndTypes}>
            <SortableContext items={appTypes.map(t => t.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {appTypes.map((type) => (
                  <div key={type.id} onClick={() => setSelectedType(type.id)} className="cursor-pointer">
                    <SortableTypeItem
                      type={type}
                      onEdit={() => {
                        setEditingType(type);
                        setTypeName(type.name);
                        setTypeDialogOpen(true);
                      }}
                      onDelete={() => handleDeleteType(type.id)}
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Examples {selectedType && `(${appTypes.find(t => t.id === selectedType)?.name})`}
            </h3>
            {selectedType && (
              <Dialog open={exampleDialogOpen} onOpenChange={setExampleDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => { setEditingExample(null); setExampleName(""); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Example
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingExample ? "Edit" : "Add"} Example</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Example Name"
                      value={exampleName}
                      onChange={(e) => setExampleName(e.target.value)}
                    />
                    <Button onClick={handleSaveExample} className="w-full">
                      Save
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          {selectedType ? (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndExamples}>
              <SortableContext items={appExamples.map(e => e.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {appExamples.map((example) => (
                    <SortableExampleItem
                      key={example.id}
                      example={example}
                      onEdit={() => {
                        setEditingExample(example);
                        setExampleName(example.name);
                        setExampleDialogOpen(true);
                      }}
                      onDelete={() => handleDeleteExample(example.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <p className="text-muted-foreground text-center py-8">Select an app type to manage examples</p>
          )}
        </Card>
      </div>
    </div>
  );
}
