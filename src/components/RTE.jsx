import { Controller } from "react-hook-form";
import { Editor } from '@tinymce/tinymce-react'

function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    {label}
                </label>
            )}
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey="9sd4hu6sx9wvwl3ca9sgtnkminbgpmiwu0tfxs9evm71h80o"
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "advlist", "autolink", "lists", "link", "image", "charmap",
                                "preview", "anchor", "searchreplace", "visualblocks", "code",
                                "fullscreen", "insertdatetime", "media", "table", "help", "wordcount","autolink", "lists"
                            ],
                            toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter | alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; line-height: 1.75; }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}
export default RTE;
